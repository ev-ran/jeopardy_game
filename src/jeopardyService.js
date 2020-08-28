//import the axios HTTP client to communicate with the API
import axios from 'axios';
class JeopardyService {
    constructor(url = 'http://jservice.io/api/random', client = axios.create()){
        this.url = url;
        this.client = client;
    }
    getQuestion(){
        return this.client.get(this.url);
    }

    getQuestionArray(){
        return this.client.get(this.url + "?count=3");
    }

    getCategoryQuestions(categoryID){
        return this.client.get("http://jservice.io/api/clues?category=" + categoryID);
    }

    getCategories(){
        return this.client.get("http://jservice.io/api/categories?count=3");
    }

    getOffsetCategories(offsetNumber){
        return this.client.get("http://jservice.io/api/categories?offset=" + offsetNumber);
    }

}
export default JeopardyService;