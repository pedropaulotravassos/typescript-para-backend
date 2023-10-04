"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("Bem vindo ao curso de TypeScript!");
});
function criaPet(id, nome, especie, idade) {
    return {
        id: id,
        nome: nome,
        especie: especie,
        idade: idade,
    };
}
var id = 0;
function geraId() {
    id = id + 1;
    return id;
}
app.post("/pets", function (req, res) {
    var pet1 = criaPet(geraId(), "Bolt", "cachorro", 3);
    var pet2 = criaPet(geraId(), "Mel", "gato", 2);
    res.send([pet1, pet2]);
});
exports.default = app;
