import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  username: string;
  verifyUrl: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
  const { username, verifyUrl } = props;
  return (
    <Html dir="ltr" lang="pt-BR">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mt-0 mb-[16px] font-bold text-[24px] text-gray-900">
                Verifique seu endereço de e-mail
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                Obrigado {username} por se cadastrar! Para concluir seu cadastro
                e proteger sua conta, verifique seu endereço de e-mail clicando
                no botão abaixo.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  className="box-border rounded-[6px] bg-blue-600 px-[32px] py-[12px] font-medium text-[16px] text-white no-underline"
                  href={verifyUrl}
                >
                  Verifique o endereço de e-mail
                </Button>
              </Section>

              <Text className="mt-0 mb-[24px] text-[14px] text-gray-600 leading-[20px]">
                Se o botão não funcionar, você pode copiar e colar este
                link no seu navegador:
                <br />
                {verifyUrl}
              </Text>

              <Text className="mt-0 mb-[32px] text-[14px] text-gray-600 leading-[20px]">
                Este link de verificação expirará em 24 horas. Se você não criou uma conta, pode ignorar este e-mail com segurança.
              </Text>

              <Hr className="my-[24px] border-gray-200" />

              <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
                Atenciosamente,
                <br />
                The Team
              </Text>
            </Section>

            <Section className="mt-[32px] border-gray-200 border-t pt-[24px]">
              <Text className="m-0 text-center text-[12px] text-gray-400 leading-[16px]">
                HawkDev
              </Text>

              <Text className="m-0 mt-[8px] text-center text-[12px] text-gray-400 leading-[16px]">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="text-gray-400 underline" href="/">
                  Unsubscribe
                </a>{" "}
                | © {new Date().getFullYear()} HawkDev. Todos os direitos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;