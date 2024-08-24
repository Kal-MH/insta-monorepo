import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
