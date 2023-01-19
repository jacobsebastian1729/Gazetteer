type Dic = {
  [key: string | number]: string;
};

type CountryListType = {
  name: {
    common: string;
  };
  region: string;
  capital?: string[];
  population: number;
  flags: {
    png: string;
  };
  languages: Dic;
};

export default CountryListType;
