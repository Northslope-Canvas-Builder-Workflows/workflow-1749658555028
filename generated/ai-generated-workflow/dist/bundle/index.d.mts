/** /ai-generated-workflow/index **/
declare module "ai-generated-workflow" {
	export { editCandidate } from 'ai-generated-workflow/ontology/actions';
	export * as $Actions from 'ai-generated-workflow/ontology/actions';
	export {} from 'ai-generated-workflow/ontology/interfaces';
	export * as $Interfaces from 'ai-generated-workflow/ontology/interfaces';
	export { Candidate } from 'ai-generated-workflow/ontology/objects';
	export * as $Objects from 'ai-generated-workflow/ontology/objects';
	export {} from 'ai-generated-workflow/ontology/queries';
	export * as $Queries from 'ai-generated-workflow/ontology/queries';
	export { $osdkMetadata } from 'ai-generated-workflow/OntologyMetadata';
	export { $ontologyRid } from 'ai-generated-workflow/OntologyMetadata';
}
/** /ai-generated-workflow/OntologyMetadata **/
declare module "ai-generated-workflow/OntologyMetadata" {
	export type $ExpectedClientVersion = '2.1.5';
	export const $osdkMetadata: {
	    extraUserAgent: string;
	};
	export const $ontologyRid = "ri.ontology.main.ontology.2a22e1b1-c62b-46cb-bb28-89c13ccd859c";
}
/** /ai-generated-workflow/ontology/actions **/
declare module "ai-generated-workflow/ontology/actions" {
	export { editCandidate } from 'ai-generated-workflow/ontology/actions/editCandidate';
}
/** /ai-generated-workflow/ontology/interfaces **/
declare module "ai-generated-workflow/ontology/interfaces" {
	export {};
}
/** /ai-generated-workflow/ontology/objects **/
declare module "ai-generated-workflow/ontology/objects" {
	export { Candidate } from 'ai-generated-workflow/ontology/objects/Candidate';
}
/** /ai-generated-workflow/ontology/queries **/
declare module "ai-generated-workflow/ontology/queries" {
	export {};
}
/** /ai-generated-workflow/ontology/actions/editCandidate **/
declare module "ai-generated-workflow/ontology/actions/editCandidate" {
	import type { ActionDefinition, ActionMetadata, ActionParam, ActionReturnTypeForOptions, ApplyActionOptions, ApplyBatchActionOptions } from 'internal/@osdk/client';
	import { $osdkMetadata } from 'ai-generated-workflow/OntologyMetadata';
	import type { Candidate } from 'ai-generated-workflow/ontology/objects/Candidate';
	export namespace editCandidate {
	    type ParamsDefinition = {
	        Candidate: {
	            multiplicity: false;
	            nullable: false;
	            type: ActionMetadata.DataType.Object<Candidate>;
	        };
	        email: {
	            multiplicity: false;
	            nullable: false;
	            type: 'string';
	        };
	        name: {
	            multiplicity: false;
	            nullable: false;
	            type: 'string';
	        };
	        resume: {
	            multiplicity: false;
	            nullable: false;
	            type: 'string';
	        };
	    };
	    interface Params {
	        readonly Candidate: ActionParam.ObjectType<Candidate>;
	        readonly email: ActionParam.PrimitiveType<'string'>;
	        readonly name: ActionParam.PrimitiveType<'string'>;
	        readonly resume: ActionParam.PrimitiveType<'string'>;
	    }
	    interface Signatures {
	        applyAction<P extends editCandidate.Params, OP extends ApplyActionOptions>(args: P, options?: OP): Promise<ActionReturnTypeForOptions<OP>>;
	        batchApplyAction<P extends ReadonlyArray<editCandidate.Params>, OP extends ApplyBatchActionOptions>(args: P, options?: OP): Promise<ActionReturnTypeForOptions<OP>>;
	    }
	}
	/**
	 * @param {ActionParam.ObjectType<Candidate>} Candidate
	 * @param {ActionParam.PrimitiveType<"string">} email
	 * @param {ActionParam.PrimitiveType<"string">} name
	 * @param {ActionParam.PrimitiveType<"string">} resume
	 */
	export interface editCandidate extends ActionDefinition<editCandidate.Signatures> {
	    __DefinitionMetadata?: {
	        apiName: 'editCandidate';
	        displayName: 'Edit Candidate';
	        modifiedEntities: {
	            Candidate: {
	                created: false;
	                modified: true;
	            };
	        };
	        parameters: editCandidate.ParamsDefinition;
	        rid: 'ri.actions.main.action-type.a68f0655-b4aa-4512-a848-b70a1da89330';
	        status: 'EXPERIMENTAL';
	        type: 'action';
	        signatures: editCandidate.Signatures;
	    };
	    apiName: 'editCandidate';
	    type: 'action';
	    osdkMetadata: typeof $osdkMetadata;
	}
	export const editCandidate: editCandidate;
}
/** /ai-generated-workflow/ontology/objects/Candidate **/
declare module "ai-generated-workflow/ontology/objects/Candidate" {
	import type { PropertyDef as $PropertyDef } from 'internal/@osdk/client';
	import { $osdkMetadata } from 'ai-generated-workflow/OntologyMetadata';
	import type { ObjectTypeDefinition as $ObjectTypeDefinition } from 'internal/@osdk/client';
	import type { ObjectSet as $ObjectSet, Osdk as $Osdk, PropertyValueWireToClient as $PropType } from 'internal/@osdk/client';
	export namespace Candidate {
	    type PropertyKeys = 'resume' | 'email' | 'name' | 'candidateId';
	    type Links = {};
	    interface Props {
	        readonly candidateId: $PropType['string'];
	        readonly email: $PropType['string'] | undefined;
	        readonly name: $PropType['string'] | undefined;
	        readonly resume: $PropType['string'] | undefined;
	    }
	    type StrictProps = Props;
	    interface ObjectSet extends $ObjectSet<Candidate, Candidate.ObjectSet> {
	    }
	    type OsdkInstance<OPTIONS extends never | '$rid' = never, K extends keyof Candidate.Props = keyof Candidate.Props> = $Osdk.Instance<Candidate, OPTIONS, K>;
	    /** @deprecated use OsdkInstance */
	    type OsdkObject<OPTIONS extends never | '$rid' = never, K extends keyof Candidate.Props = keyof Candidate.Props> = OsdkInstance<OPTIONS, K>;
	}
	export interface Candidate extends $ObjectTypeDefinition {
	    osdkMetadata: typeof $osdkMetadata;
	    type: 'object';
	    apiName: 'Candidate';
	    __DefinitionMetadata?: {
	        objectSet: Candidate.ObjectSet;
	        props: Candidate.Props;
	        linksType: Candidate.Links;
	        strictProps: Candidate.StrictProps;
	        apiName: 'Candidate';
	        description: '';
	        displayName: 'Candidate';
	        icon: {
	            type: 'blueprint';
	            color: '#4C90F0';
	            name: 'cube';
	        };
	        implements: [];
	        interfaceMap: {};
	        inverseInterfaceMap: {};
	        links: {};
	        pluralDisplayName: 'Candidate';
	        primaryKeyApiName: 'candidateId';
	        primaryKeyType: 'string';
	        properties: {
	            /**
	             *   display name: 'Candidate Id'
	             */
	            candidateId: $PropertyDef<'string', 'non-nullable', 'single'>;
	            /**
	             *   display name: 'Email'
	             */
	            email: $PropertyDef<'string', 'nullable', 'single'>;
	            /**
	             *   display name: 'Name'
	             */
	            name: $PropertyDef<'string', 'nullable', 'single'>;
	            /**
	             *   display name: 'Resume'
	             */
	            resume: $PropertyDef<'string', 'nullable', 'single'>;
	        };
	        rid: 'ri.ontology.main.object-type.bd436ab3-d523-4341-9bf5-0106f0f5bb3e';
	        status: 'EXPERIMENTAL';
	        titleProperty: 'name';
	        type: 'object';
	        visibility: 'NORMAL';
	    };
	}
	export const Candidate: Candidate;
}