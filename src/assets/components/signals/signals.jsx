import seedrandom from "seedrandom";

export const GetSignals = ({ game, round }) => {


    const gameName = (typeof game == "object" && game != null ? game.name : "x")
    const seed = `${game}${round}`

    console.log(seed)
    const rng = seedrandom(seed)

    const getCrashSignal = (mode = 0) => { //aviator
        let results = [];

        const maxValues = {
            0: 1.5,
            1: 2.0,
            2: 8.0,
        };
        const max = maxValues[mode];

        const generateNumber = () => {
            let num;
            do {
                num = rng() * max;
            } while (num <= 1.17);
            return num.toFixed(2);
        };

        for (let i = 0; i < 3; i++) {
            results.push(`Retirar em <strong class="highlighted"> ${generateNumber()}x </strong>`);
        }

        // 35% chance to skip a round
        if (rng() < 0.35) {
            results[1] = 'Pular Rodada';
        }

        return results.join('<br/>');
    };
    const getMinesSignal = (quanty) => { //mines
        let newGrid = Array(5).fill(Array(5).fill('🟦')); // Resetting the grid
        newGrid = JSON.parse(JSON.stringify(newGrid)); // Deep copy
        let count = 0;
        const positions = [];

        while (count < quanty) {
            const x = Math.floor(rng() * 5);
            const y = Math.floor(rng() * 5);
            const position = `${x}-${y}`;

            if (!positions.includes(position)) {
                newGrid[x][y] = '⭐';
                positions.push(position);
                count++;
            }
        }

        // Convert the grid to a string (or HTML)
        const gridString = newGrid.map(row => row.join('')).join('<br/>');
        return gridString;
    };
    const getFortuneSignal = () => { //tigrin
        const random = () => Math.floor(rng() * (10 - 3) + 3);

        const normal = random();
        const turbo = random();

        return `<strong class="highlighted">${normal}x normal</strong>  e <br/> <strong class="highlighted">${turbo}x turbo</strong>  alternado`;
    }
    const getRouletteSignal = () => { //roleta
        const signals = [
            `Entrem no <strong class="highlighted"> vermelho </strong>`,
            `Entrem no <strong class="highlighted"> preto </strong>`,
            `Joguem nos <strong class="highlighted"> pares </strong>`,
            `Joguem nos <strong class="highlighted"> ímpares </strong>`,
            `Entrem no <strong class="highlighted"> 1 a 18 </strong>`,
            `Entrem no <strong class="highlighted"> 19 a 36 </strong>`,
            `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 2ª </strong> coluna`,
            `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 3ª </strong> coluna`,
            `Entrem na <strong class="highlighted"> 2ª </strong> e <strong class="highlighted"> 3ª </strong> coluna`,
            `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 2ª </strong> dúzia`,
            `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 3ª </strong> dúzia`,
            `Entrem na <strong class="highlighted"> 2ª </strong> e <strong class="highlighted"> 3ª </strong> dúzia`,
        ];

        const complements = ["1 tentativa", "2 tentativas", "3 tentativas"];

        const randomSignal = signals[Math.floor(rng() * signals.length)];
        const randomComplement = complements[Math.floor(rng() * complements.length)];

        return `${randomSignal}, vcs tem ${randomComplement}, não esqueçam de sempre cobrir o zero!`;
    };

    const getTwiceSignal = (op1, op2) => { //double
        const random = () => Math.floor(rng() * 2);

        const twiceOptions = [op1, op2]


        return twiceOptions[random()]

    }
    const getSquadSignal = (op1, op2, op3, op4) => { //quatro opções
        const random = () => Math.floor(rng() * 4);

        const squadOptions = [op1, op2, op3, op4]


        return squadOptions[random()]

    }



    /* ifs */

    function loadSignals(game) {

        let finalMessage
        let sinal



        if (game == "Mines") {
            finalMessage = getMinesSignal(5)

        }

        if (game === "Aviator" || game === "Spaceman") {
            finalMessage = getCrashSignal()
        }




        if (game === "Fortune Tiger") {
            finalMessage = getFortuneSignal();
        }

        if (game === "Roleta") {
            sinal = getRouletteSignal();
            finalMessage = `${sinal} <br/>
        `


        }

        /*VIP GAMES*/

        if (game === "Fortune Rabbit") {
            finalMessage = getFortuneSignal();
        }

        if (game === "Fortune Ox") {
            finalMessage = getFortuneSignal();
        }


        if (game === "BacBo") {
            sinal = getTwiceSignal(`Entre no <strong class="highlighted"> Azul </strong> `, `Entre no <strong class="highlighted">Vermelho</strong>`)
            finalMessage = `Esse tá fácil! <br/>
        ${sinal} e marque o EMPATE. <br/> `
        }
        if (game === "DragonTiger") {
            sinal = getTwiceSignal(`Aposte no <strong class="highlighted"> Dragão </strong> `, `Aposte no <strong class="highlighted">Tigre</strong>`)
            finalMessage = `É sinalzinho que vcs querem?? <br/>
        ${sinal} e marque o EMPATE. <br/> `
        }
        if (game === "FootballStudio") {
            sinal = getTwiceSignal(`Aposte na <strong class="highlighted"> Casa </strong> `, `Aposte no <strong class="highlighted">Visitante</strong>`)
            finalMessage = `É sinalzinho que vcs querem?? <br/>
        ${sinal} e lembra de marcar o EMPATE. <br/> `
        }

        if (game === "LightingDice") {
            sinal = getSquadSignal(`NÚMERO ALTO`, `NÚMERO BAIXO`, `QUALQUER DUPLO`, `QUALQUER TRIPLO`)
            finalMessage = `Podem apostar em <strong class="highlighted"> ${sinal}!! </strong>`

        }

        if (game == "NinjaCrash") {
            sinal = (Math.floor(rng() * (4 - 2) + 2))
            finalMessage = `Entrem e façam <strong class="highlighted"> ${sinal} </strong>`
        }

        return finalMessage

    }

    console.log(loadSignals(game))

    return loadSignals(game);
}
