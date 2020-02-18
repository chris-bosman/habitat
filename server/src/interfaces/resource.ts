import { arrayProp, prop, Typegoose, ModelType, InstanceType, Ref } from '@typegoose/typegoose';

class Resource extends Typegoose {
    @prop({ required: true, unique: true })
    _id?: string;

    @prop({ required: true })
    resource?: string;

    @prop({ required: true })
    resourceType?: string;

    @prop({ required: true })
    resourceName?: string;
    
    @prop({ required: true })
    resourceProvider?: string;

    @prop({ required: true })
    resourceAttributes?: any;

    @arrayProp({ items: String, required: false })
    resourceDependencies?: string[];

    @prop({ required: true })
    resourceSerial?: number;

    @prop({ required: true })
    resourceLineage?: string;
}

export const ResourceModel = new Resource().getModelForClass(Resource);