import * as VKID from "@vkid/sdk";
import { createRoot } from "react-dom/client";

VKID.Config.init({
    app: import.meta.env.VITE_VK_SDK_APP_ID,
    redirectUrl: import.meta.env.VITE_VK_ID_REDIRECT_URL,
    scope: "email",
    responseMode: VKID.ConfigResponseMode.Callback,
});

const root = createRoot(document.getElementById("root")!);

root.render(
    <div>
        <h3>Hello world</h3>
    </div>
);
