window.Event = new Vue();

Vue.component('sandbox', {
    template: `
        <div class="site-wrap">
            <div class="container">
                <griderator />
            </div>
        </div>
    `,
})

Vue.component('griderator', {
    template: `
        <div class="board">
            <div class="grid" :style="getGridStyle()">
                <img v-for="cell in grids" style="width:20px; height:20px;" :key="cell.name" :src="'valucremap/' + cell.name" />
            </div>
        </div>
    `,
    data: () => ({
        grids: [],
        tileCounts: [],
        max: 4,
    }),
    computed: {
        allTiles() {
            return 'none';
        }
    },
    created() {
        this.constructTileCounts(this.max);
    },
    methods: {
        getGridStyle(count) {
            return `color: red;`
        },
        constructTileCounts(max) {
            let mirror = [];
            for (let i = 0; i <= max; i++) {
                let count = null;
                let child = {
                    total: Math.pow(4, i),
                    z: i,
                }
                mirror.push(child)
            }
            this.tileCounts = mirror;
            console.log(this.tileCounts);
            this.constructGrids()
        },
        constructGrids() {
            this.grids = [];
            this.tileCounts.forEach(count => {
                let mirror = [];
                // console.log(count.total)
                const tilerows = Math.sqrt(count.total);
                for (let i = 0; i < count.total; i++) {
                    const x = i % tilerows;
                    const y = (i >= tilerows) ? Math.floor(i / tilerows) : 0;
                    const name = `${count.z}-${x}-${y}.png`
                    let child = {
                        name: name,
                        x: x,
                        y: y,
                        z: count.z,
                    }
                    // mirror.push(child)
                    console.log(child)
                    this.grids.push(child);
                }
            })
            console.log(this.grids)
        },
        legacyConstructGrids() {
            this.boards.forEach(board => {
                board.zoomLevel = this.findZoomLevel(board.width / this.opts.size);
                let mirror = [];
                for (let i = 0; i < board.tilecount; i++) {
                    let column = i % board.tilerows;
                    let row = (i >= board.tilerows) ? Math.floor(i / board.tilerows) : 0;
                    // let x1 = (column * this.opts.size) + board.pos[0];
                    // let y1 = (row * this.opts.size) * -1 - board.pos[1];
                    // if (y1 === -0)
                    //     y1 = 0;
                    // let x2 = (+x1) + (+this.opts.size);
                    // let y2 = y1 - this.opts.size;
                    // let quad = null;
                    // if (column + 1 > (board.tilerows / 2)) {
                    //     if (row + 1 > (board.tilerows / 2)) {
                    //         quad = 3;
                    //     } else {
                    //         quad = 1;
                    //     }
                    // } else {
                    //     if (row + 1 > (board.tilerows / 2)) {
                    //         quad = 2;
                    //     } else {
                    //         quad = 0;
                    //     }
                    // }
                    // mirror.push({
                    //     name: null,
                    //     x: column,
                    //     y: row,
                    //     z: board.zoomLevel,
                    //     quadrant: quad,
                    //     exists: false,
                    //     selected: false,
                    //     hover: false,
                    //     rect: [x1, y1, x2, y2],
                    // });
                    // console.log(`calculated zoom: ${board.zoomLevel}, tile ${i} at column ${column}, row ${row} has rect: [${x1}, ${y1}, ${x2}, ${y2}]`)
                }
                // board.grid = mirror;
            });
            // console.log(this.boards);
        }
    }
})

var app = new Vue({
    el: '#app',
    methods: {
        getCSS(prop) { return window.getComputedStyle(document.documentElement).getPropertyValue('--' + prop); },
        setCSS(prop, data) { document.documentElement.style.setProperty('--' + prop, data); },
    }
})