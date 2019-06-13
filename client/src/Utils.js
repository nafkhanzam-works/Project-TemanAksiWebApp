import Axios from 'axios';
import React from 'react';
import { Typography } from '@material-ui/core';

export const redirect = function(url) {
	window.location.href =
		'/' +
		(url ||
			new URL(window.location.href).searchParams.get('redirect') ||
			'');
};
export const widerFieldStyle = function(widthCount) {
	return { maxWidth: 250 * widthCount, width: '100%' };
};
export const apiGet = function(url, setData, setError) {
	return () => {
		let mounted = true;
		Axios.get(url)
			.then(res => {
				if (mounted) setData(res.data);
			})
			.catch(err => {
				if (mounted) setError(err);
			});
		return () => {
			mounted = false;
		};
	};
};
export const apiGetCB = function(url, cb) {
	return () => {
		let mounted = true;
		Axios.get(url)
			.then(res => {
				if (mounted) cb(false, res.data);
			})
			.catch(err => {
				if (mounted) cb(err, null);
			});
		return () => {
			mounted = false;
		};
	};
};
export const apiPost = function(url, body, setData, setError) {
	return () => {
		let mounted = true;
		Axios.post(url, body)
			.then(res => {
				if (mounted) setData(res.data);
			})
			.catch(err => {
				if (mounted) setError(err);
			});
		return () => {
			mounted = false;
		};
	};
};
export const apiPostCB = function(url, body, cb) {
	return () => {
		let mounted = true;
		Axios.post(url, body)
			.then(res => {
				if (mounted) cb(false, res.data);
			})
			.catch(err => {
				if (mounted) cb(err, null);
			});
		return () => {
			mounted = false;
		};
	};
};
export const res200 = function(res) {
	if (res.status !== 200) throw new Error(res);
	return true;
};
export const getError = function(err) {
	return err
		? err.response
			? err.response.emailResponse
				? err.response.emailResponse
				: err.response.data
			: err.message
		: 'Error found!';
};
export const loadingComponent = function(data, error) {
	if (data === null || data === undefined || error)
		return (
			<Typography>
				{error
					? error.status === 500
						? 'Tidak bisa konek ke server, hubungi developer!'
						: 'Data tidak ditemukan'
					: 'Loading...'}
			</Typography>
		);
};
