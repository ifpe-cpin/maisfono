// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  request_base_url: 'https://jrpires.com/mais-fono-rest/public/index.php/v1',
  host_url_server: 'https://jrpires.com/mais-fono-rest/public/index.php',
  host_url_client: 'https://localhost:4200',
  pusher: {
    key: '527a8eb84680c6505dbe',
    cluster: 'us2',
  }
};
