import { graphql } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { ContentContainerInformationFragment } from '../../../types/graphql-types';
import Title from '../elements/title';
import ContentBlock from '../contentBlocks/contentBlock';
import Carousel from './carousel';
import FaqContainer from './faqContainer';
import PetitionsContentContainer from './petitionsContentContainer';
import QuotesCarousel from './quotesCarousel';

export enum ContentContainerAppearance {
  Carousel = 'carousel',
  FAQContainer = 'faqContainer',
  Petitions = 'petitions',
  QuotesCarousel = 'quotesCarousel',
}

interface Props {
  data: ContentContainerInformationFragment;
}

const Container = styled.div``;

const ContentContainer: FC<Props> = ({ data }) => {
  if (data.appearance === ContentContainerAppearance.Carousel) {
    return <Carousel data={data} />;
  }

  if (data.appearance === ContentContainerAppearance.FAQContainer) {
    return <FaqContainer data={data} />;
  }

  if (data.appearance === ContentContainerAppearance.Petitions) {
    return <PetitionsContentContainer data={data} />;
  }

  if (data.appearance === ContentContainerAppearance.QuotesCarousel) {
    return <QuotesCarousel data={data} />;
  }

  return (
    <>
      <Container>
        <Title type="h4" title={data.title!} />
      </Container>
      {data.contentModules?.map(c => (
        <ContentBlock data={c!} />
      ))}
    </>
  );
};

export const query = graphql`
  fragment ContentContainerInformation on ContentfulContentContainer {
    title
    internal {
      type
    }
    appearance
    contentModules {
      ...ContentBlockInformation
    }
    ...QuotesCarouselInformation
  }
`;

export default ContentContainer;
