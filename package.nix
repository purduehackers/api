{ rustPlatform, fetchFromGitHub, openssl, pkg-config }:

rustPlatform.buildRustPackage rec {
  pname = "purdue-hackers-api";
  version = "0.2.0";

  meta.mainProgram = "backend";

  src = fetchFromGitHub {
    owner = "purduehackers";
    repo = "api";
    rev = "e4fd55b2cbc7caa714a2e5e6954f7d17c0eb5956";
    hash = "sha256-oYuX/X95WQh5mQJDoh2W7wzzqX7nscdS/JrRVornaRA=";
  };

  nativeBuildInputs = [ pkg-config ];
  buildInputs = [ openssl ];

  cargoHash = "sha256-aWZjA+/FFidG15W4n85NZNrTyFWWSD0dkJC36SJHZ6I=";
  cargoDepsName = pname;
}
