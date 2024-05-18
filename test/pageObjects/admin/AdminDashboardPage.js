import { Label } from "../../../framework/elements/index.js";
import BasePage from "../../../framework/page/BasePage.js";


class AdminDashboardPage extends BasePage{
    constructor(){
        super(new Label(`//h2[text()="Add Doctor"]`, "Add Doctor form header"), "Unique element of admin page dashboard");
    }
}

export default new AdminDashboardPage();