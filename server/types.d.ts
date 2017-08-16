export interface IConfig {
  port?: number;
  secret?: string;
  env?: string;
  fileLog?: string | boolean;
  useNgExpressEngine?: boolean;
}
