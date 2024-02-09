import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  pageId?: number;
}

const Meta = ({ title, description, imageUrl, pageId }: Props) => {
  const fullUrl = `${window.location.origin}/${pageId}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
    </Helmet>
  );
};

export default Meta;
