import { Helmet } from "react-helmet-async";

import { RoutePath } from "@/routes/Routes";

interface Props {
  title: string;
  description: string;
  imageUrl?: string;
  path: RoutePath;
}

const Meta = ({ title, description, imageUrl, path }: Props) => {
  const fullUrl = `${window.location.origin}/${path}`;

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
