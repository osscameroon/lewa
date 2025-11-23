<!--
# SPDX-FileCopyrightText: 2025 Brady Fomegne and contributors
#
# SPDX-License-Identifier: MPL-2.0

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

lewa
===

![Screenshot From 2025-05-13 21-36-44](https://github.com/user-attachments/assets/4b593e17-916f-4854-b68f-67f8a404a47f)

A platform to learn African writing systems.

Background
---

Africa is home to several writing systems. However, most of these systems are primarily used by linguists and are not widely adopted by the general population. Today, many Africans rely on English or French spellings to express native sounds in writing.

While Input Method Engines (IMEs) exist to facilitate typing in these scripts, they assume prior knowledge of the writing system. But how can someone use an IME if they haven't learned the script?

Through this project, we aim to make African writing systems more accessible by helping users learn not only the scripts themselves, but also their alphabets and pronunciations.

## Table of Contents
* [Installation](#-installation)
* [Contributing](#-contributing)
* [Support](#%EF%B8%8F-support)
* [License](#license)

## 📖 Installation

Lewa can be installed via Pip or Docker. To start, clone the repo to your local computer and change into the proper directory.

### 🧰 Prerequisites 

- **Python 3.11+** ([Download](https://python.org))  
- **Docker** (Optional) ([Install Docker](https://docs.docker.com/get-started/get-docker/))  
- **UV** (Optional, for fast Python package management) ([Install UV](https://docs.astral.sh/uv/getting-started/installation/))  

### Install Dependencies

- With Pip:

```sh
pip install .
```

- With uv:

```sh
uv sync
```

- With Docker: Not needed

### Setup

- With Python:

```sh
python lewa/manage.py migrate
```

- With uv:

```sh
uv run lewa/manage.py migrate
```
 
- With Docker: Not needed 

### Run the App

- With Python:

```sh
python lewa/manage.py runserver
```

- With uv:

```sh
uv run lewa/manage.py runserver
```

- With Docker: 

```sh
docker compose up -d
```  

### Load the dummy data

- With Python:

```sh
python lewa/manage.py shell -c "import core.dummy_data"
```
  
- With uv:

```sh
uv run lewa/manage.py shell -c "import core.dummy_data"
```

- With Docker:

```sh
docker compose exec lewa ./entrypoint.sh shell -c \"import core.dummy_data\"
```

**Access the webapp**  
  Open your browser at: [http://127.0.0.1:8000](http://127.0.0.1:8000) or [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) for the admin

## 🤝 Contributing

Contributions, issues and feature requests are welcome! See [CONTRIBUTING.md](https://github.com/wsvincent/lithium/blob/master/CONTRIBUTING.md).

## ⭐️ Support

Give a ⭐️  if this project helped you!

## License

All the code in this repository is released under the Mozilla Public License v2.0, for more information take a look at the [LICENSE](LICENSE) file.
