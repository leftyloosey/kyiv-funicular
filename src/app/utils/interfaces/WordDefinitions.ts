export interface wordDefinitions {}
export interface defDefinitions extends wordDefinitions {
  definitions: string[];
}
export interface exmpDefinition extends wordDefinitions {
  examples: string[];
}
