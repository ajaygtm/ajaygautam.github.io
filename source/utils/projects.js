import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const projectsDir = path.join(process.cwd(), 'source', 'content', 'projects');

export async function fetchProjects() {
	if (!fs.existsSync(projectsDir)) {
		return [];
	}

	const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));

	return files
		.map(filename => {
			const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf8');
			const {data, content} = matter(raw);
			return {
				...data,
				body: content,
				url: `/projects/${data.slug}`,
			};
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}
