import { InitState } from "../context/CategoryContext";

export function setInitState(state: InitState): Promise<void> {
  return new Promise((resolve) => {
    const vals = state;

    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getInitState(): Promise<InitState> {
  return new Promise((resolve) => {
    chrome.storage.local.get("state", (res: InitState) => {
      resolve(res);
    });
  });
}
