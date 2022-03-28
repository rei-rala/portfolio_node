import { errNotFound, errServer } from "./errors";


const middleware = {
    errNotFound,
    errServer
}

export default middleware;
export { errNotFound, errServer };