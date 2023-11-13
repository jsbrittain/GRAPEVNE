import { GetModuleConfig } from "./web";
import { GetModuleConfigFile } from "./web";
import { GetModuleDocstring } from "./web";
import { ParseDocstring } from "./web";
import { GetLocalModules } from "./web";
import { GetFolders } from "./web";
import { GetModulesList } from "./web";
import { GetRemoteModulesGithub } from "./web";
import { GetRemoteModulesGithubDirectoryListing } from "./web";
import { GetRemoteModulesGithubBranchListing } from "./web";
import { FormatName } from "./web";
import { GetModuleClassification } from "./web";


// GetModuleConfig

test.skip("GetModuleConfig", async () => {
  const repo = {};
  const snakefile = "";
  const config = await GetModuleConfig(repo, snakefile);
});

// GetModuleConfigFile

test.skip("GetModuleConfig", async () => {
  const repo = {};
  const snakefile = "";
  const config = await GetModuleConfigFile(repo, snakefile);
});

// GetModuleDocstring

test.skip("GetModuleDocstring", async () => {
  const repo = {};
  const snakefile = "";
  const config = await GetModuleDocstring(repo, snakefile);
});

// ParseDocstring

test("ParseDocstring", () => {
  const workflow_str = `"""This is a docstring
Line 2
Line 3
"""`;
  const expected_docstring = "This is a docstring\nLine 2\nLine 3";
  const docstring = ParseDocstring(workflow_str);
  expect(docstring).toStrictEqual(expected_docstring);
});

test("ParseDocstring_empty", () => {
  const workflow_str = ``;
  const expected_docstring = "";
  const docstring = ParseDocstring(workflow_str);
  expect(docstring).toStrictEqual(expected_docstring);
});

test("ParseDocstring_no_docstring", () => {
  const workflow_str = `This is not a docstring
Line 2
Line 3`;
  const expected_docstring = "";
  const docstring = ParseDocstring(workflow_str);
  expect(docstring).toStrictEqual(expected_docstring);
});

test("ParseDocstring_no_docstring", () => {
  const workflow_str = `not a valid docstring
"""This docstring is not at the top of the file
Line 2
Line 3`;
  const expected_docstring = "";
  const docstring = ParseDocstring(workflow_str);
  expect(docstring).toStrictEqual(expected_docstring);
});

// GetModulesList

test.skip("GetModulesList", async () => {
  const url = {};
  const listing = await GetModulesList(url);
});

// GetFolders

test.skip("GetFolders", () => {
  const root_folder = "";
  const folders = GetFolders(root_folder);
});

// GetLocalModules

test.skip("GetLocalModules", () => {
  const root_folder = "";
  const modules = GetLocalModules(root_folder)
});

// GetRemoteModulesGithub

test.skip("GetRemoteModulesGithub", async () => {
  const repo = "";
  const listing_type = "";
  const modules = GetRemoteModulesGithub(repo, listing_type);
});

// GetRemoteModulesGithubDirectoryListing

test.skip("GetRemoteModulesGithubDirectoryListing", async () => {
  const repo = "";
  const listing = await GetRemoteModulesGithubDirectoryListing(repo);
});

// GetRemoteModulesGithubBranchListing

test.skip("GetRemoteModulesGithubBranchListing", async () => {
  const repo = "";
  const listing = await GetRemoteModulesGithubBranchListing(repo);
});

// FormatName

test("FormatName", () => {
  const name = "some name";
  expect(FormatName(name)).toStrictEqual(name)
});

// GetModuleClassification

test("GetModuleClassification_module", () => {
  // input_namespace with a value is a module
  const config = {
    input_namespace: "in",
  }
  expect(GetModuleClassification(config)).toStrictEqual("module");
});

test("GetModuleClassification_module", () => {
  // input_namespace with an empty value is a module
  const config = {
    input_namespace: "",
  }
  expect(GetModuleClassification(config)).toStrictEqual("module");
});

test("GetModuleClassification_module", () => {
  // a missing input_namespace is interpreted as blank (not null) and is a module
  const config = {}
  expect(GetModuleClassification(config)).toStrictEqual("module");
});

test("GetModuleClassification_source", () => {
  // input_namespace set to null is a source
  const config = {
    input_namespace: null,
  }
  expect(GetModuleClassification(config)).toStrictEqual("source");
});
