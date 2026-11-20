const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=emetcapital.com.au";

const BADGES = {
  light: {
    src: "/images/google-preferred-source/google_preferred_source_badge_light_en.png",
    srcSet:
      "/images/google-preferred-source/google_preferred_source_badge_light_en.png 1x, /images/google-preferred-source/google_preferred_source_badge_light_en@2x.png 2x",
  },
  dark: {
    src: "/images/google-preferred-source/google_preferred_source_badge_dark_en.png",
    srcSet:
      "/images/google-preferred-source/google_preferred_source_badge_dark_en.png 1x, /images/google-preferred-source/google_preferred_source_badge_dark_en@2x.png 2x",
  },
} as const;

type PreferredSourceLinkProps = {
  variant?: keyof typeof BADGES;
};

const PreferredSourceLink = ({ variant = "light" }: PreferredSourceLinkProps) => {
  const badge = BADGES[variant];

  return (
    <a className="preferred-source-link" href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener">
      <img
        src={badge.src}
        srcSet={badge.srcSet}
        width={338}
        height={107}
        alt="Add Emet Capital as a preferred source on Google"
        decoding="async"
        loading="lazy"
      />
    </a>
  );
};

export default PreferredSourceLink;
