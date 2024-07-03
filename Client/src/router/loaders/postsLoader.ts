import { ApiWorker } from "../../helpers/ApiWorker";

export async function postsLoader() {
    return await ApiWorker.getPosts();
}