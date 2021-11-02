import { generateMessage } from './generate-message.js';

export const listPackages = ({ packages, readme }) =>
	generateMessage({
		updates: packages.map(
			({ pkg, path }) =>
				`-   [\`${pkg.name}\`](https://github.com/guardian/node-modules/tree/main/${path})\n` +
				`    -   ${pkg.description}.`,
		),
		label: 'PACKAGES',
		url: import.meta.url,
		original: readme,
	});
