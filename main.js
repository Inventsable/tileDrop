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
            <div v-for="(grid, key) in grids" :key="key" class="grid" :style="getGridStyle(grid)">
                <img v-for="(cell,index) in grid" :key="index" style="width:20px; height:20px;" :key="cell.name" :src="'default/' + cell.name" />
            </div>
        </div>
    `,
    data: () => ({
        grids: [],
        tileCounts: [],
        max: 5,
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
            console.log(count);
            let cols = Math.sqrt(count.length);
            console.log(cols)
            return `
                display: grid;
                grid-template-columns: repeat(${cols}, 1fr);
                border: 2px solid red;
            `
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
                    let name = null;
                    if (count.z >= 5) {
                        let direction = null;
                        if (x >= 17)
                            direction = true;
                        else
                            direction = false;
                        name = `${count.z}/${(direction) ? 'B' : 'A'}/${count.z}-${x}-${y}.png`
                    } else {
                        name = `${count.z}/${count.z}-${x}-${y}.png`
                    }
                    let child = {
                        name: name,
                        x: x,
                        y: y,
                        z: count.z,
                    }
                    mirror.push(child)
                    // console.log(child)
                }
                this.grids.push(mirror);
            })
            console.log(this.grids)
        },
    }
})

var app = new Vue({
    el: '#app',
    methods: {
        getCSS(prop) { return window.getComputedStyle(document.documentElement).getPropertyValue('--' + prop); },
        setCSS(prop, data) { document.documentElement.style.setProperty('--' + prop, data); },
    }
})