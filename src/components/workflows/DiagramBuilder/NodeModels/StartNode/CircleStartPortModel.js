import * as _ from "lodash";
import { LinkModel, DiagramEngine, PortModel, DefaultLinkModel } from "storm-react-diagrams";

export class CircleStartPortModel extends PortModel {
    position: string | "top" | "bottom" | "left" | "right";

    constructor(pos: string = "right") {
        super(pos, "start");
        this.position = pos;
    }

    serialize() {
        return _.merge(super.serialize(), {
            position: this.position
        });
    }

    link(port: PortModel): LinkModel {
        let link = this.createLinkModel();
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }

    deSerialize(data: any, engine: DiagramEngine) {
        super.deSerialize(data, engine);
        this.position = data.position;
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}
