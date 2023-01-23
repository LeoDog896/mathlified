interface SubPart {
	body: string;
	marks?: number;
	partNo?: number;
	uplevel?: string;
}
interface Part {
	body?: string;
	marks?: number;
	parts?: SubPart[];
	partNo?: number;
	uplevel?: string;
}
export interface Question {
	title?: string;
	body?: string;
	marks?: number;
	parts?: Part[];
	partNo?: number;
}

export function contentHandler(qn: Question): string {
	let str = '\\begin{questions}\n\n';
	str += formatQn(qn);
	str += '\n\\end{questions}';
	return str;
}

export function formatQn(qn: Question) {
	let str = '\\question';
	if (qn.marks) {
		str += '[' + qn.marks.toString() + ']';
	}
	str += '\n\t';
	if (qn.body) {
		str += qn.body;
	}
	if (qn.parts) {
		str += '\n\t\\begin{parts}';
		qn.parts.forEach((part) => {
			if (part.uplevel) {
				str += `\n\t\\uplevel{${part.uplevel}}\n`;
			}
			if (part.partNo) {
				str += `\n\t\\setcounter{partno}{${part.partNo - 1}}`;
			}
			str += '\n\t\t\\part';
			if (part.marks) {
				str += '[' + part.marks.toString() + ']';
			}
			str += '\n\t\t';
			if (part.body) {
				str += '\t' + part.body;
			}
			if (part.parts) {
				str += '\n\t\t\\begin{subparts}';
				part.parts.forEach((subpart) => {
					if (subpart.uplevel) {
						str += `\n\t\t\\uplevel{${subpart.uplevel}}\n`;
					}
					if (subpart.partNo) {
						str += `\n\t\t\\setcounter{subpart}{${subpart.partNo - 1}}`;
					}
					str += '\n\t\t\t\\subpart';
					if (subpart.marks) {
						str += '[' + subpart.marks.toString() + ']';
					}
					str += '\n\t\t\t';
					if (subpart.body) {
						str += '\t' + subpart.body;
					}
					if (subpart.marks) {
						str += '\n\t\t\\droppoints\n';
					}
				});
				str += '\n\t\t\\end{subparts}';
			}
			if (part.marks) {
				str += '\n\t\\droppoints\n';
			}
		});
		str += '\n\t\\end{parts}';
	}
	if (qn.marks) {
		str += '\\droppoints\n';
	}
	return str;
}
