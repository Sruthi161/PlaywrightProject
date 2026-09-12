import { envConstants } from "../constants/envConstants";
import sfdata from "../test-data/sfdata.json";

export class FrameworkHelper{

    loadTestData(envName: envConstants) {
        return sfdata[envName]
}
}


