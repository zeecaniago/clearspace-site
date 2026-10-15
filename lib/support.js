// Email setup is a separate launch task; remove the public setup notices once delivery is verified.
export const supportEmail = "support@mereday.app";
export const supportMailto = `mailto:${supportEmail}`;
export const appleTermsURL =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export function pageMetadata(title, description, path) {
  return {
    title: `${title} · Mereday`,
    description,
    alternates: { canonical: `https://mereday.app${path}` },
    openGraph: {
      title: `${title} · Mereday`,
      description,
      url: `https://mereday.app${path}`,
      type: "website",
    },
  };
}
