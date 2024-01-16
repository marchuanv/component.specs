import { addSchema, setMetaSchemaOutputFormat, validate } from "@hyperjump/json-schema/draft-2020-12";
import { VERBOSE } from "@hyperjump/json-schema/experimental";
import Jasmine from 'jasmine';
import { fileURLToPath, pathToFileURL } from 'url';
import vm from "vm";
import { General } from './lib/general.mjs';
import { Import } from './lib/import.mjs';
import { InterfaceRegistry } from './lib/interface.registry.mjs';
import { Member } from './lib/reflect/member.mjs';
import { Type } from "./lib/reflect/type.mjs";
import { Schema } from './lib/schema.mjs';
import { Security } from './lib/security.mjs';
import { Specs } from './lib/specs.mjs';

const general = new General();
const importExtended = new Import();
const security = new Security();
const { walkDir } = General;

export { EventEmitter } from 'events';
export { Buffer } from 'node:buffer';
export { constants, createHmac, generateKeyPairSync, privateDecrypt, publicEncrypt, randomBytes } from 'node:crypto';
export { existsSync, lstatSync, readFileSync, readdirSync, statSync } from 'node:fs';
export { basename, join, resolve } from 'node:path';
export { ClassInterface } from './lib/class.interface.mjs';
export { Container } from './lib/container.mjs';
export { GUID } from './lib/guid.mjs';
export { ClassMember } from './lib/reflect/class.member.mjs';
export { MemberParameter } from './lib/reflect/member.parameter.mjs';
export { MethodMember } from './lib/reflect/method.member.mjs';
export { PrimitiveType } from './lib/reflect/primitivetype.mjs';
export { PropertyMember } from './lib/reflect/property.member.mjs';
export { ReferenceType } from './lib/reflect/referencetype.mjs';
export { TypeMapper } from './lib/reflect/type.mapper.mjs';
export { Serialiser } from './lib/serialiser.mjs';
export { ClassA } from './specs/classes/classA.mjs';
export { ClassB } from './specs/classes/classB.mjs';

const baseUrl = import.meta.url;
const currentDir = fileURLToPath(new URL('./', baseUrl));

setMetaSchemaOutputFormat(VERBOSE);

export { InterfaceRegistry, Jasmine, Member, Schema, Specs, Type, VERBOSE, addSchema, currentDir, fileURLToPath, general, importExtended, pathToFileURL, security, validate as validateSchema, vm, walkDir };

InterfaceRegistry.load('./lib');
InterfaceRegistry.load('./specs/classes');
