type FetchExploreDataParams = {
  data: SearchDataType;
  pageNum: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<SearchDataType>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  mediaType: string;
  filters: any;
  setSortby: React.Dispatch<React.SetStateAction<any>>;
  setGenre: React.Dispatch<React.SetStateAction<any>>;
};
