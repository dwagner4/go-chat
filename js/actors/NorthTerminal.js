import { Actor, createGlbLoader } from '@dwagner4/3js-classes';

export default class NorthTerminal extends Actor {
  async init() {
    const glbloader = createGlbLoader();
    const [nTermData] = await Promise.all([
      glbloader.loadAsync('/assets/terminal_test2-yescomp-noanim.glb'),
    ]);

    const mymodel = nTermData.scene;

    const recursiveshadow = obj => {
      for (let s = 0; s < obj.children?.length; s += 1) {
        // eslint-disable-next-line no-param-reassign
        obj.children[s].castShadow = true;
        if (obj.children[s].children.length > 0) {
          recursiveshadow(obj.children[s]);
        }
      }
    };
    mymodel.castShadow = true;
    recursiveshadow(mymodel);

    console.log(mymodel);
    this.model = mymodel;
  }
}
