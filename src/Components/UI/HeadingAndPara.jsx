/* eslint-disable react/prop-types */
export const SectionHeading = ({ name, className }) => {
  return <h3 className={`SectionHeading ${className}`}>{name}</h3>;
};
export const CardHeading = ({ name, className }) => {
  return <h3 className={`CardHeading ${className}`}>{name}</h3>;
};
