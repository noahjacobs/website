import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/about.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
      	'pages/about-contents/ExperienceLinks.js': {
          js: require('docs/src/pages/about-contents/ExperienceLinks').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about-contents/ExperienceLinks'), 'utf8')
`,
        },
        'pages/about-contents/Projects.js': {
          js: require('docs/src/pages/about-contents/Projects').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about-contents/Projects'), 'utf8')
`,
        },
        'pages/about-contents/ExperienceCard.js': {
          js: require('docs/src/pages/about-contents/ExperienceCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about-contents/ExperienceCard'), 'utf8')
`,
        },
        'pages/about-contents/Coursework.js': {
          js: require('docs/src/pages/about-contents/Coursework').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about-contents/Coursework'), 'utf8')
`,
        },
        'pages/about-contents/CourseworkInd.js': {
          js: require('docs/src/pages/about-contents/CourseworkInd').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/about-contents/CourseworkInd'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
