//Module laden
const tk = require('./index');
//Module mit API Key initialisieren
tk("00000000-0000-0000-0000-000000000002");

//Alle Anfragen werden async gemacht und müssen deshalb in eine solche Funktion
(async function f() {
    //inRadius enthält jetzt die Antwort des Servers.
    const inRadius = await tk.listInRadius(52.521, 13.438, 105, "all", "dist");
    await tk.getPricesByStationIDs(["474e5046-deaf-4f9b-9a32-9797b778f047", "4429a7d9-fb2d-4c29-8cfe-2ca90323f9f8"]);
    await tk.getDetailByStationID("429a7d9-fb2d-4c29-8cfe-2ca90323f9f8");
})();
