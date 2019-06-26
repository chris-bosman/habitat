import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

class ResourceDependency {
    @prop()
    resourceDependencies?: string;
}

class Resource extends Typegoose {
    @prop({ required: true, unique: true })
    _id?: string;

    @prop({ required: true })
    resource: string;

    @prop({ required: true })
    resourceType: string;

    @prop({ required: true })
    resourceName: string;
    
    @prop({ required: true })
    resourceProvider: string;

    @prop({ required: true })
    resourceAttributes: any;

    @prop({ ref: ResourceDependency, required: true })
    resourceDependencies: ResourceDependency;

    @prop({ required: true })
    resourceSerial: number;

    @prop({ required: true })
    resourceLineage: string;
}

export const ResourceModel = new Resource().getModelForClass(Resource);