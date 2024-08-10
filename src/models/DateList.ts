type Item = {
  type: string;
  text: string;
  name: string;
};

export interface DateList {
  [key: string]: Item[];
}
