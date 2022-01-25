// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IMutation {
__typename: "Mutation";
register: boolean | null;
}

interface IRegisterOnMutationArguments {
input: IUserInput;
}

interface IUserInput {
email: string;
password: string;
lastName?: string;
firstName?: string;
age?: number;
}


interface IHelloOnQueryArguments {
  name?: string | null;
}
}

// tslint:enable
