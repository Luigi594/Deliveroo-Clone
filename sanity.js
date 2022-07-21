import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { PROJECT_ID } from "@env"

// connection to the backend with sanity
const client = sanityClient({
    projectId: PROJECT_ID,
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
});

// allow us to have an imagen builder, pull the image from the backend
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;