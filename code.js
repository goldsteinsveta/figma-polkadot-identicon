// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-identicon') {
        const nodes = [];
        // // BG
        // const rect = figma.createRectangle();
        // rect.cornerRadius = 999;
        // rect.x = 0;
        // rect.resize(256,256);
        // rect.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.2, b: 0.2}}];
        const dotR = 36;
        // DOT COLS
        for (let x = 0; x < 5; x++) {
            let dotY = 16;
            let dot_count = 5;
            if (x === 0 || x === 4) {
                dotY = dotY + 48;
                dot_count = 3;
            }
            else if (x === 1 || x === 3) {
                dotY = dotY + 24;
                dot_count = 4;
            }
            let col_start = {
                x: 28 + x * (5 + dotR),
                y: dotY,
            };
            for (let y = 0; y < dot_count; y++) {
                const rect = figma.createRectangle();
                rect.cornerRadius = dotR;
                rect.resize(dotR, dotR);
                rect.x = col_start.x;
                rect.y = col_start.y;
                // dot height + vertical margin between dots
                col_start.y = col_start.y + dotR + 11;
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
                figma.currentPage.selection = nodes;
            }
        }
        // figma.viewport.scrollAndZoomIntoView(nodes);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
