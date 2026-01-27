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

interface SecretFriendEmailProps {
  participantName: string;
  groupName: string;
  revealUrl: string;
}

const SecretFriendEmail = (props: SecretFriendEmailProps) => {
  const { participantName, groupName, revealUrl } = props;

  return (
    <Html dir="ltr" lang="pt-BR">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mt-0 mb-[16px] font-bold text-[24px] text-gray-900">
                Seu amigo secreto foi sorteado! 🎁
              </Text>

              <Text className="mt-0 mb-[16px] text-[16px] text-gray-700 leading-[24px]">
                Olá {participantName},
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                O sorteio do amigo secreto do grupo{" "}
                <span className="font-semibold">&quot;{groupName}&quot;</span>{" "}
                foi realizado com sucesso.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  className="box-border rounded-[6px] bg-emerald-600 px-[32px] py-[12px] font-medium text-[16px] text-white no-underline"
                  href={revealUrl}
                >
                  Ver meu amigo secreto
                </Button>
              </Section>

              <Text className="mt-0 mb-[24px] text-[14px] text-gray-600 leading-[20px]">
                Se o botão não funcionar, você pode copiar e colar este link no
                seu navegador:
                <br />
                {revealUrl}
              </Text>

              <Hr className="my-[24px] border-gray-200" />

              <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
                Boas festas e bom amigo secreto!
                <br />
                HawkDev
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SecretFriendEmail;

