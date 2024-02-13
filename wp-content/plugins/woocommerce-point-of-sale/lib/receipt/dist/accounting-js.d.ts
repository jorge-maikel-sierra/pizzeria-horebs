declare module 'accounting-js/lib' {
  interface CurrencyFormat {
      pos: string; // for positive values, eg. "$ 1.00"
      neg?: string | undefined; // for negative values, eg. "$ (1.00)"
      zero?: string | undefined; // for zero values, eg. "$  --"
  }

  interface NumberSettings {
      precision?: number | undefined; // default precision on numbers is 0
      thousand?: string | undefined;
      decimal?: string | undefined;
  }

  interface Settings<TFormat> {
      symbol?: string | undefined; // default currency symbol is '$'
      format?: TFormat | undefined; // controls output: %s = symbol, %v = value/number
      decimal?: string | undefined; // decimal point separator
      thousand?: string | undefined; // thousands separator
      precision?: number | undefined; // decimal places
      number: NumberSettings;
  }

  // format any number or stringified number into currency
  function formatMoney(number: number | string, symbol?: string, precision?: number, thousand?: string, decimal?: string, format?: string): string;
  function formatMoney(number: number | string, options: CurrencySettings<string> | CurrencySettings<CurrencyFormat>): string;

  function formatMoney(numbers: number[], symbol?: string, precision?: number, thousand?: string, decimal?: string, format?: string): string[];
  function formatMoney(numbers: number[], options: CurrencySettings<string> | CurrencySettings<CurrencyFormat>): string[];

  // generic case (any array of numbers)
  function formatMoney(numbers: any[], symbol?: string, precision?: number, thousand?: string, decimal?: string, format?: string): any[];
  function formatMoney(numbers: any[], options: CurrencySettings<string> | CurrencySettings<CurrencyFormat>): any[];

  // format a list of values for column-display
  function formatColumn(numbers: number[], symbol?: string, precision?: number, thousand?: string, decimal?: string, format?: string): string[];
  function formatColumn(numbers: number[], options: CurrencySettings<string> | CurrencySettings<CurrencyFormat>): string[];

  function formatColumn(numbers: number[][], symbol?: string, precision?: number, thousand?: string, decimal?: string, format?: string): string[][];
  function formatColumn(numbers: number[][], options: CurrencySettings<string> | CurrencySettings<CurrencyFormat>): string[][];

  // format a number with custom precision and localisation
  function formatNumber(number: number, precision?: number, thousand?: string, decimal?: string): string;
  function formatNumber(number: number, options: NumberSettings): string;

  function formatNumber(number: number[], precision?: number, thousand?: string, decimal?: string): string[];
  function formatNumber(number: number[], options: NumberSettings): string[];

  function formatNumber(number: any[], precision?: number, thousand?: string, decimal?: string): any[];
  function formatNumber(number: any[], options: NumberSettings): any[];

  // better rounding for floating point numbers
  function toFixed(number: number, precision?: number): string;

  // get a value from any formatted number/currency string
  function unformat(string: string, decimal?: string): number;

  // settings object that controls default parameters for library methods
  const settings: Settings

  export {
    settings,
    unformat,
    toFixed,
    formatMoney,
    formatNumber,
    formatColumn
  }
}
