import Head from "next/head";

export const useMetaData = (
  title: string,
  description: string,
  href: string
) => {
  return (
    <Head>
      <title>{title} | Brubblio</title>
      <link rel="shortcut icon" href="/" type="image/png" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={href} />
      <meta property="og:image" content="/assets/countbot-logo.png" />
      <meta content="#407aed" data-react-helmet="true" name="theme-color" />
    </Head>
  );
};
