import React from 'react';

import { HomePageQuery } from '../../types/graphql-types';
import Layout from '../components/layout/layout';
import PageContent from '../components/pageContent';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';

interface Props {
  data: HomePageQuery;
}

const FAQPage: React.FC<Props> = ({ data }) => {
  const intl = useIntl();
  return (
    <Layout>
      <SEO
        title={data.contentfulPage?.title!}
        description={data.contentfulPage?.seoDescription ?? undefined}
        lang={intl.locale}
      />
      <PageContent data={data.contentfulPage!} />
    </Layout>
  );
};

export const query = graphql`
  query FaqPage($locale: String) {
    contentfulPage(slug: { eq: "faq" }, node_locale: { eq: $locale }) {
      ...pageInformation
      title
      seoDescription
    }
  }
`;

export default FAQPage;