import axios from "axios";

import { iteratePaginatedAPI } from "@notionhq/client";

let store = {};

async function customNotionAPI(params) {
  // Gửi yêu cầu đến một endpoint API của Notion với params được cung cấp
  let url = `https://late-band-aeed.nhockanthi001.workers.dev/blocks/${params.block_id}/children`;

  if (params.start_cursor) {
    url += `?start_cursor=${params.start_cursor}`;
  }

  const response = await axios.get(url);

  // Kiểm tra xem Notion API có trả về next_cursor hay không
  if (!response.data.has_more || !response.data.next_cursor) {
    return {
      results: response.data.results,
      has_more: false,
      next_cursor: null, // Không còn trang tiếp theo
    };
  }

  // Trả về dữ liệu cần thiết để sử dụng với iteratePaginatedAPI
  return {
    results: response.data.results,
    has_more: response.data.has_more,
    next_cursor: response.data.next_cursor, // Đảm bảo next_cursor được cập nhật
  };
}

/* 
---------------------------------------------------------------------------
*/

// Take rich text array from a block child that supports rich text and return the plain text.
// Note: All rich text objects include a plain_text field.
const getPlainTextFromRichText = (richText) => {
  return richText.map((t) => t.plain_text).join("");
  // Note: A page mention will return "Undefined" as the page name if the page has not been shared with the integration. See: https://developers.notion.com/reference/block#mention
};

// Use the source URL and optional caption from media blocks (file, video, etc.)
const getMediaSourceText = (block) => {
  let source, caption;

  if (block[block.type].external) {
    source = block[block.type].external.url;
  } else if (block[block.type].file) {
    source = block[block.type].file.url;
  } else if (block[block.type].url) {
    source = block[block.type].url;
  } else {
    source = "[Missing case for media block types]: " + block.type;
  }
  // If there's a caption, return it with the source
  if (block[block.type].caption.length) {
    caption = getPlainTextFromRichText(block[block.type].caption);
    return caption + ": " + source;
  }
  // If no caption, just return the source URL
  return source;
};

// Get the plain text from any block type supported by the public API.
const getTextFromBlock = async (block, parentBlockName) => {
  let text;

  // Get rich text from blocks that support it
  if (block[block.type].rich_text) {
    // This will be an empty string if it's an empty line.
    text = getPlainTextFromRichText(block[block.type].rich_text);
  }
  // Get text for block types that don't have rich text
  else {
    switch (block.type) {
      case "unsupported":
        // The public API does not support all block types yet
        text = "[Unsupported block type]";
        break;
      case "bookmark":
        text = block.bookmark.url;
        break;
      case "child_database":
        text = block.child_database.title;
        // Use "Query a database" endpoint to get db rows: https://developers.notion.com/reference/post-database-query
        // Use "Retrieve a database" endpoint to get additional properties: https://developers.notion.com/reference/retrieve-a-database
        break;
      case "child_page":
        text = block.child_page.title;
        break;
      case "embed":
      case "video":
      case "file":
      case "image":
      case "pdf":
        text = getMediaSourceText(block);
        break;
      case "equation":
        text = block.equation.expression;
        break;
      case "link_preview":
        text = block.link_preview.url;
        break;
      case "synced_block":
        // Provides ID for block it's synced with.
        text = block.synced_block.synced_from
          ? "This block is synced with a block with the following ID: " +
            block.synced_block.synced_from[block.synced_block.synced_from.type]
          : "Source sync block that another blocked is synced with.";
        break;
      case "table":
        // Only contains table properties.
        // Fetch children blocks for more details.
        text = "Table width: " + block.table.table_width;
        break;
      case "table_of_contents":
        // Does not include text from ToC; just the color
        text = "ToC color: " + block.table_of_contents.color;
        break;
      case "breadcrumb":
      case "column_list":
      case "divider":
        text = "No text available";
        break;
      default:
        text = "[Needs case added]";
        break;
    }
  }
  // Blocks with the has_children property will require fetching the child blocks. (Not included in this example.)
  // e.g. nested bulleted lists
  if (block.has_children) {
    // For now, we'll just flag there are children blocks.
    text = text + " (Has children)";
    return await main(block.id, block.toggle.rich_text[0].plain_text);
  } else {
    // Includes block type for readability. Update formatting as needed.
    return { type: block.type, text: text, name: parentBlockName };
  }
};

async function retrieveBlockChildren(id) {
  console.log("Retrieving blocks (async)...");
  const blocks = [];

  // Use iteratePaginatedAPI helper function to get all blocks first-level blocks on the page
  for await (const block of iteratePaginatedAPI(
    customNotionAPI as any,
    {
      block_id: id, // A page ID can be passed as a block ID: https://developers.notion.com/docs/working-with-page-content#modeling-content-as-blocks
    } as any
  )) {
    blocks.push(block);
  }

  return blocks;
}

const printBlockText = async (blocks, parentBlockName) => {
  for (let i = 0; i < blocks.length; i++) {
    const text: any = await getTextFromBlock(blocks[i], parentBlockName);
    // Print plain text for each block.
    if (text?.name) {
      if (!store[text.name]) {
        store[text.name] = [];
      }
      store[text.name].push(text);
    }
  }
};

async function main(blockId = "", parentBlockName = null) {
  // Make API call to retrieve all block children from the page provided in .env
  const blocks = await retrieveBlockChildren(blockId);
  // Get and print plain text for each block.
  await printBlockText(blocks, parentBlockName);
}

export async function getText(pageId) {
  store = {};
  await main(pageId);
  return store;
}
