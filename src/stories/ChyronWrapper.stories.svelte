<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ChyronWrapper } from '../lib/index.js';
  import "../routes/index.css"

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'ChyronWrapper',
    component: ChyronWrapper,
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    argTypes: {
      headline: {
        control: 'boolean'
      },
      headlines: {
        control: 'object'
      },
      logo: {
        control: 'boolean',
      },
      chyron: {
        control: 'boolean',
      }
    }
  });
</script>

<!-- The full Chyron Set -->
<Story name="Everything" args={{ primary: true }} />

<!-- Only the Chyron -->

<Story name="Chyron" args={{ chyron: true, logo: false, headline: false }} />

<!-- Only the Logo -->

<Story name="Logo" args={{ chyron: false, logo: true, headline: false }} />

<!-- Only the Headline -->

<Story name="Headline" args={{ chyron: false, logo: false, headline: true }} />
