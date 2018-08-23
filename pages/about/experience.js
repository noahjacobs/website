import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/about/experience.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
      	'pages/about/ExperienceLinks.js': {
          js: require('docs/src/pages/about/ExperienceLinks').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about/ExperienceLinks'), 'utf8')
`,
        },
        'pages/about/Projects.js': {
          js: require('docs/src/pages/about/Projects').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about/Projects'), 'utf8')
`,
        },
        'pages/about/ExperienceCard.js': {
          js: require('docs/src/pages/about/ExperienceCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about/ExperienceCard'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
