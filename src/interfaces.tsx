export interface Errore {
	data: string;
	descrizione: string;
	minuti: string;
	video: string;
	id: string;
}

export interface NavLinkProps {
	attivo: string;
	testo: string;
	premuto: (e: any) => any;
}

export interface TextFieldProps {
	id?: string;
	label: string;
	value: string;
	setValue: (value: string) => void;
	placeholder: string;
}

export interface NavbarProps {
	attivo: string;
	setAttivo: (attivo: string) => any;
}

export interface TextAreaProps {
	id?: string;
	label: string;
	placeholder: string;
	value: string;
	setValue: (value: string) => void;
}

export interface DataProps {
	id?: string;
	data: string;
	setData: (data: string) => any;
	placeholder: string;
	label: string;
}
