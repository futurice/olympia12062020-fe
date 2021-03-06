import axios from 'axios';
import { useIntl } from 'gatsby-plugin-intl';
import React, { FC, useCallback, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';

import Input from '../elements/input';
import Textarea from '../elements/textarea';
import {
  contentMaxWidth,
  applyMediaQueryMd,
  contentMargin,
  applyMediaQueryLg,
} from '../../style/dimensions';
import Button from '../elements/button';
import Checkbox from '../elements/checkbox';
import Select from '../elements/select';
import Flex from '../elements/flex';
import Paragraph from '../elements/paragraph';

interface Props {}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: ${contentMaxWidth};
  margin: 0 auto;

  > :not(:first-child) {
    margin-top: 24px;
  }

  > * {
    margin: 0 ${contentMargin.sm};
  }

  ${applyMediaQueryMd(css`
    > * {
      margin: 0 ${contentMargin.md};
    }
  `)}

  ${applyMediaQueryLg(css`
    > * {
      margin: 0 ${contentMargin.lg};
    }
  `)}
`;

const SubmitButton = styled(Button)`
  margin-right: 16px;
`;

const ContactForm: FC<Props> = () => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [botField, setBotField] = useState('');
  const [statusLabel, setStatusLabel] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitting(true);
      axios
        .post('/.netlify/functions/contact-form', {
          botField,
          name,
          email,
          category,
          subject,
          message,
          agreedTerms,
        })
        .then(() => {
          setMessage('');
          setSubject('');
          setAgreedTerms(false);
          setStatusLabel(intl.formatMessage({ id: `contact.success` }));
        })
        .catch(() =>
          setStatusLabel(intl.formatMessage({ id: `contact.failure` }))
        )
        .finally(() => setIsSubmitting(false));
    },
    [agreedTerms, botField, category, email, intl, message, name, subject]
  );

  const options = useMemo(
    () =>
      ['general', 'tickets', 'petitions', 'info', 'volunteer', 'press'].map(
        value => ({
          value,
          label: intl.formatMessage({ id: `contact.category.${value}` }),
        })
      ),
    [intl]
  );

  return (
    <Form onSubmit={onSubmit}>
      <div hidden aria-hidden="true">
        <label>
          <Input
            name="bot-field"
            value={botField}
            label="Don’t fill this out if you're human..."
            onValueChange={setBotField}
          />
        </label>
      </div>
      <Input
        type="text"
        name="name"
        mandatory
        label={intl.formatMessage({ id: `contact.name` })}
        value={name}
        onValueChange={setName}
      />
      <Input
        type="email"
        name="email"
        mandatory
        label={intl.formatMessage({ id: `contact.email` })}
        value={email}
        onValueChange={setEmail}
      />
      <Select
        label={intl.formatMessage({ id: `contact.category.label` })}
        name="category"
        options={options}
        value={category}
        onValueChange={setCategory}
      />
      <Input
        type="text"
        name="subject"
        label={intl.formatMessage({ id: `contact.subject` })}
        value={subject}
        mandatory
        onValueChange={setSubject}
      />
      <Textarea
        label={intl.formatMessage({ id: `contact.message` })}
        name="message"
        value={message}
        mandatory
        onValueChange={setMessage}
      />
      <Checkbox
        label={intl.formatMessage({ id: `contact.terms` })}
        mandatory
        name="agreedTerms"
        onValueChange={setAgreedTerms}
        value={agreedTerms}
      />

      <Flex alignItems="center">
        <SubmitButton
          disabled={isSubmitting}
          type="submit"
          label={intl.formatMessage({ id: `contact.send` })}
        />
        <Paragraph style={{ marginBottom: 0, marginTop: 0 }} type="small">
          {statusLabel}
        </Paragraph>
      </Flex>
    </Form>
  );
};

export default ContactForm;
