import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface FormNotificationEmailProps {
  name: string
  email: string
  phone?: string
  business?: string
  loanType?: string
  loanAmount?: string
  message?: string
}

export const FormNotificationEmail = ({
  name,
  email,
  phone,
  business,
  loanType,
  loanAmount,
  message,
}: FormNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New Commercial Lending Application from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Commercial Lending Application</Heading>
        
        <Text style={text}>
          A new commercial lending application has been submitted through your website.
        </Text>

        <Section style={section}>
          <Heading style={h2}>Applicant Details</Heading>
          <Text style={detailText}><strong>Name:</strong> {name}</Text>
          <Text style={detailText}><strong>Email:</strong> {email}</Text>
          {phone && <Text style={detailText}><strong>Phone:</strong> {phone}</Text>}
          {business && <Text style={detailText}><strong>Business:</strong> {business}</Text>}
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Heading style={h2}>Loan Details</Heading>
          {loanType && <Text style={detailText}><strong>Loan Type:</strong> {loanType}</Text>}
          {loanAmount && <Text style={detailText}><strong>Loan Amount:</strong> {loanAmount}</Text>}
        </Section>

        {message && (
          <>
            <Hr style={hr} />
            <Section style={section}>
              <Heading style={h2}>Message</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>
          </>
        )}

        <Hr style={hr} />
        
        <Text style={footer}>
          This email was automatically generated from the Emet Capital website contact form.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default FormNotificationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  margin: '20px 0 10px',
  padding: '0',
}

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const detailText = {
  color: '#404040',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const messageText = {
  color: '#404040',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '12px 0',
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '6px',
  border: '1px solid #e5e5e5',
}

const section = {
  margin: '24px 0',
}

const hr = {
  borderColor: '#e5e5e5',
  margin: '20px 0',
}

const footer = {
  color: '#898989',
  fontSize: '12px',
  lineHeight: '20px',
  marginTop: '32px',
  fontStyle: 'italic',
}