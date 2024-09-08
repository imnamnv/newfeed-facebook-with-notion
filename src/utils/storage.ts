export function setInitState(state: any): Promise<void> {
  return new Promise((resolve) => {
    const vals = state;

    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getInitState(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.local.get("state", (res: any) => {
      resolve(res);
    });
  });
}
