export interface wordDefinitions {
  definitions?: string[];
  examples?: string[];
}
export interface defDefinitions extends wordDefinitions {
  definitions: string[];
}
export interface exmpDefinition extends wordDefinitions {
  examples: string[];
}
